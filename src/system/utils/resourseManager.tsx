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
     * テーブルの取得
     * @param target テーブル名
     * @param columnNumList カラムの番号
     * @returns テーブル
     */
     public getRecordList(target: string) {
        return (this.resourse[target] as string[][]).filter((record) => {
            return this.filterCondition(record);
        });
    }
};

export default ResourseManager;
