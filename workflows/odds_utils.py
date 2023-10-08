def get_odds_type(raw_odds: str) -> str:
    if raw_odds.startswith('+') or raw_odds.startswith('-'):
        return 'moneyline'
    if '/' in raw_odds:
        return 'fractional'
    return 'decimal'


def parse_moneyline(odds: str) -> float:
    if odds.startswith('+'):
        return 1 + float(odds[1:]) / 100
    return 1 + 100 / float(odds[1:])


def parse_fractional(odds: str) -> float:
    numerator, denominator = odds.split('/')
    return 1 + float(numerator) / float(denominator)


def parse_decimal(odds: str) -> float:
    return float(odds)


def parse_odds(odds: str) -> float:
    odds_type = get_odds_type(odds)
    if odds_type == 'moneyline':
        return parse_moneyline(odds)
    if odds_type == 'fractional':
        return parse_fractional(odds)
    return parse_decimal(odds)
