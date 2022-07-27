import ContentsUtil from "./contentsUtil";

class ResourseManager {
    private resourse: any;

    private filterCondition: (record: string[]) => boolean;

    constructor(resourse: any) {
        this.resourse = resourse;
        this.filterCondition = () => {return true};
    }

    public setFilterCondition(filterCondition: (record: string[]) => boolean){
        this.filterCondition = filterCondition;
    }

    /** 初期化(常に全部表示(true)する) */
    public resetFilter(){
        this.filterCondition = () => {return true};
    }

    /**
     * テーブル(二重配列)の取得
     * @param target テーブル名
     * @param columnNameList カラム名
     * @returns テーブル
     */
    public getRecordList(target: string, columnNameList: string[]) {
        return (this.resourse[target] as any[]).map((record) => {
            return columnNameList.map((cell) => {
                return record[cell] as string;
            });
        }).filter((record) => {
            return this.filterCondition(record);
        });
    }

    /**
     * 変換リストの取得
     * @returns 変換リスト
     */
    public getSubsysList(){
        const subsysList: ContentsUtil.ConvertInfo[] = [];
        (this.resourse['kubunList'] as any[]).forEach((value) => {
            if(value['kubunCtg'] === 'sys_table') {
                subsysList.push({key: value['kubunId'], value: value['kubunNam']});
            }
        });
        return subsysList;
    }
};

export default ResourseManager;
