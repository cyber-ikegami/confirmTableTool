import ContentsBuilder from "./common/contentsBuilder";
import ContentsUtil from "../utils/contentsUtil";
import DefineUtil from "../utils/defineUtil";

class ColdfBuilder implements ContentsBuilder {
    tabName(): string {
        return DefineUtil.COLDF_TAB_NAME;
    };
    getOutputAreaProps(): ContentsUtil.OutputAreaInfo {
        return {
            target: 'coldfList',
            columnInfoList: [
                { columnName: 'テーブルID', num: 0, width: 80 },
                { columnName: 'カラムID', num: 1, width: 80 },
                { columnName: 'カラム名', num: 2, width: 330 },
                { columnName: 'ドメイン', num: 3, width: 330 },
                { columnName: 'キー', num: 4, width: 35 },
                { columnName: '必須', num: 5, width: 35 },
                { columnName: '連番', num: 6, width: 35 }
            ]
        }
    };
    functionList(): ContentsUtil.FunctionInfo[] {
        return [];
    };
};

export default ColdfBuilder;