import ContentsUtil from "../../utils/contentsUtil";

export interface ContentsBuilder {
    /** ヘッダーのタブ名 */
    tabName(): string;
    /** 出力エリア */
    getOutputAreaProps(): ContentsUtil.OutputAreaInfo;
    /** フッターのボタン */
    functionList(): ContentsUtil.FunctionInfo[];
};

export default ContentsBuilder;