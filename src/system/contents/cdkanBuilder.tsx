import ContentsUtil from "../utils/contentsUtil";
import ContentsBuilder from "./common/contentsBuilder";
import DefineUtil from "../utils/defineUtil";

class CdkanBuilder implements ContentsBuilder {
    tabName(): string {
        return DefineUtil.CDKAN_TAB_NAME;
    };
    getOutputAreaProps(): ContentsUtil.OutputAreaInfo {
        return {
            target: 'cdkanList',
            columnInfoList: [
                { columnName: 'コード分類', num: 0, width: 80 },
                { columnName: '管理情報', num: 1, width: 80 },
                { columnName: '管理情報名', num: 2, width: 200 },
                { columnName: '内容', num: 3, width: 1000 }
            ]
        }
    };
    functionList(): ContentsUtil.FunctionInfo[] {
        return [{
            labelName: '戻る', destTabName: DefineUtil.CODDF_TAB_NAME, filterCondition: () => { return true }
        }];
    };
};

export default CdkanBuilder;