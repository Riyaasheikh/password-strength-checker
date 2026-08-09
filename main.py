import sys
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.prompt import Prompt
from rich.text import Text

from src.core.validator import PasswordValidator
from src.core.entropy import EntropyCalculator
from src.services.pwned_service import BreachChecker

console = Console()

def display_header():
    console.clear()
    header_text = Text("DECODELABS INDUSTRIAL KIT", style="bold cyan")
    sub_text = Text("\nProject 1: Password Strength & Security Analyzer", style="dim white")
    console.print(Panel(header_text + sub_text, expand=False, border_style="cyan"))

def analyze_password(password: str):
    # Run analysis modules
    validator = PasswordValidator(password)
    entropy_calc = EntropyCalculator(password)
    breach_checker = BreachChecker(password)

    policy_results = validator.check_rules()
    entropy_results = entropy_calc.get_entropy_metrics()
    
    with console.status("[bold green]Checking breach databases (k-Anonymity)..."):
        breach_results = breach_checker.check_pwned_status()

    # Rule Verification Table
    rule_table = Table(title="Policy Rule Compliance", show_header=True, header_style="bold magenta")
    rule_table.add_column("Rule Check", style="dim")
    rule_table.add_column("Status", justify="center")

    rule_table.add_row("Min Length (>= 8 chars)", "[green]PASS[/green]" if policy_results["length_ok"] else "[red]FAIL[/red]")
    rule_table.add_row("Uppercase Letter [A-Z]", "[green]PASS[/green]" if policy_results["has_upper"] else "[red]FAIL[/red]")
    rule_table.add_row("Lowercase Letter [a-z]", "[green]PASS[/green]" if policy_results["has_lower"] else "[red]FAIL[/red]")
    rule_table.add_row("Numeric Digit [0-9]", "[green]PASS[/green]" if policy_results["has_digit"] else "[red]FAIL[/red]")
    rule_table.add_row("Special Symbol [@,#,$,etc]", "[green]PASS[/green]" if policy_results["has_symbol"] else "[red]FAIL[/red]")

    console.print(rule_table)

    # Security Summary Panel
    rating = entropy_results["rating"]
    bits = entropy_results["entropy_bits"]
    
    # Determine overall rating color
    if rating in ["Very Weak", "Weak"]:
        rating_color = "bold red"
    elif rating == "Reasonable":
        rating_color = "bold yellow"
    else:
        rating_color = "bold green"

    summary_text = f"Entropy Score: [{rating_color}]{bits} bits ({rating})[/{rating_color}]\n"
    summary_text += f"Character Pool Space: [bold]{entropy_results['pool_size']}[/bold] symbols\n"

    if breach_results["is_breached"]:
        summary_text += f"Breach Status: [bold red]CRITICAL EXPOSURE[/bold red] (Found in {breach_results['breach_count']:,} breaches!)"
    else:
        summary_text += "Breach Status: [bold green]CLEAN[/bold green] (No known exposures)"

    console.print(Panel(summary_text, title="Security Assessment", border_style="cyan"))

def main():
    display_header()
    while True:
        password = Prompt.ask("\nEnter password to evaluate (or type 'exit' to quit)", password=True)
        if password.lower() == 'exit':
            console.print("\n[bold cyan]Exiting Industrial Security Kit. Stay safe![/bold cyan]")
            sys.exit(0)
        
        display_header()
        analyze_password(password)

if __name__ == "__main__":
    main()