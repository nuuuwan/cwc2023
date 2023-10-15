from workflows import update_version
from workflows.UpdateODIIDToWinner import UpdateODIIDToWinner
from workflows.UpdatePointsTable import UpdatePointsTable
from workflows.UpdateTeam1IDToTeam2IDToOddsPair import \
    UpdateTeam1IDToTeam2IDToOddsPair
from workflows.UpdateTeamIDToPWinner import UpdateTeamIDToPWinner


def main():
    for _class in [
        UpdateODIIDToWinner,
        UpdatePointsTable,
        UpdateTeam1IDToTeam2IDToOddsPair,
        UpdateTeamIDToPWinner,
    ]:
        _class().write()

    update_version.main()


if __name__ == '__main__':
    main()
