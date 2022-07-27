import ContentsBuilder from "./common/contentsBuilder";
import ContentsUtil from "../utils/contentsUtil";
import DefineUtil from "../utils/defineUtil";

class TbldfBuilder implements ContentsBuilder {
    subsysList: ContentsUtil.ConvertInfo[];
    constructor(subsysList: ContentsUtil.ConvertInfo[]) {
        this.subsysList = subsysList;
    }

    tabName(): string {
        return DefineUtil.TBLDF_TAB_NAME;
    };
    getOutputAreaProps(): ContentsUtil.OutputAreaInfo {
        return {
            target: 'tbldfList',
            columnInfoList: [
                { columnName: 'tblDef', width: 80 },
                { columnName: 'tblNam', width: 330 },
                { columnName: 'subsys', width: 180, convertList: this.subsysList }
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

