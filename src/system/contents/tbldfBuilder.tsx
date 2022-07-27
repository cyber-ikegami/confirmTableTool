import ContentsBuilder from "./common/contentsBuilder";
import ContentsUtil from "../utils/contentsUtil";
import DefineUtil from "../utils/defineUtil";

class TbldfBuilder implements ContentsBuilder {tabName(): string {
        return DefineUtil.TBLDF_TAB_NAME;
    };
    getOutputAreaProps(): ContentsUtil.OutputAreaInfo {
        return {
            target: 'tbldfList',
            columnInfoList: [
                { columnName: 'テーブルID', num: 0, width: 80 },
                { columnName: 'テーブル名', num: 1, width: 330 },
                { columnName: 'グループ', num: 2, width: 150, convertListName: 'groupList' },
                { columnName: '概要', num: 3, width: 400 },
                { columnName: 'サブシステム', num: 4, width: 180, convertListName: 'subsyList' },
                { columnName: '連番', num: 5, width: 35 }
            ]
        }
    };
    functionList(): ContentsUtil.FunctionInfo[] {
        return [
            { labelName: '関連カラム', destTabName: DefineUtil.COLDF_TAB_NAME, filterCondition: (curRecord: string[], destRecord: string[]) => {
                return curRecord[0] === destRecord[0];
            }}
        ];
    };
};

export default TbldfBuilder;

