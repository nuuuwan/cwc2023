import os
import webbrowser

from utils import Log

EXCEL_PATH = os.path.abspath(os.path.join('data', 'cwc2023.odds.xlsx'))
ODI_LIST_XLSX_PATH = os.path.abspath(
    os.path.join('data', 'cwc2023.group_stage.odi_list.xlsx')
)

log = Log('main')


def open_files():
    for path in [ODI_LIST_XLSX_PATH]:
        os.startfile(path)

    for url in [
        'https://www.cricketworldcup.com/fixtures',
        'https://www.oddschecker.com/cricket',
        'https://www.oddschecker.com/cricket/world-cup/winner',
        'https://www.oddsportal.com/cricket/world/icc-world-cup/',
    ]:
        webbrowser.open(url)


if __name__ == '__main__':
    open_files()
