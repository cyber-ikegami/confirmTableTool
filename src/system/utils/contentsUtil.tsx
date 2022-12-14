namespace ContentsUtil {
    /** 出力エリア */
    export type OutputAreaInfo = {
        // テーブル名
        target: string;
        // カラム情報
        columnInfoList: ColumnInfo[];
    };
    
    /** カラム */
    export type ColumnInfo = {
        // カラム名
        columnName: string;
        // 配列の何番目の情報か
        num: number;
        // 幅
        width: number;
        // 変換リスト名
        convertListName?: string;
    };

    /** フッターのボタン */
    export type FunctionInfo = {
        // ボタン名
        labelName: string;
        // 遷移先のタブ名
        destTabName: string;
        // フィルターの条件
        filterCondition: (curRecord: string[], destRecord: string[]) => boolean;
    };
};

export default ContentsUtil;