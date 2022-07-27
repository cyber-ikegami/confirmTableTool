import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import TbldfBuilder from './contents/tbldfBuilder';
// import CoddfBuilder from './contents/coddfBuilder';
import ContentsBuilder from './contents/common/contentsBuilder';
import TableBuilder from './tableBuilder';
import ResourseManager from './utils/resourseManager';
import ColdfBuilder from './contents/coldfBuilder';
// import CdkanBuilder from './contents/cdkanBuilder';
// import zlib from 'zlib';

const MainFrame = () => {
  // 選択中のタブ
  const [focus, setFocus] = useState<number>(-1);
  // 取得したファイルの中身
  const [resourseManager, setResourseManager] = useState<null | ResourseManager>(null);

  const contentsList: ContentsBuilder[] = [
    new TbldfBuilder(),
    new ColdfBuilder()
    // new CoddfBuilder(),
    // new CdkanBuilder()
  ];

  // 遷移先タブ名からfocus番号に変換
  const getFocusNoFromTabName = (tabName: string): number => {
    let focusNo = -1;
    contentsList.forEach((v, i) => {
      if (v.tabName() === tabName) {
        focusNo = i;
      }
    })
    setFocus(focusNo);
    return focusNo;
  };

  // ヘッダー
  const headerJsxList = contentsList.map((value, i) => {
    return (
      <_Tab isActive={focus === i} key={i} onClick={() => {
        (resourseManager as ResourseManager).resetFilter();
        setFocus(i);
      }}>{value.tabName()}</_Tab>
    );
  });

  // 出力エリア
  const outputAreaJsx = useMemo(() => {
    if (focus === -1) {
      return <></>;
    }
    const target = contentsList[focus].getOutputAreaProps().target;
    const columnInfoList = contentsList[focus].getOutputAreaProps().columnInfoList;
    return (
      <TableBuilder
        resourseManager={resourseManager as ResourseManager}
        target={target}
        columnInfoList={columnInfoList}
        selectContents={contentsList[focus]}
        getFocusNoFromTabName={getFocusNoFromTabName}
      ></TableBuilder>
    );
  }, [focus]);

  return (
    <_Frame>
      <_SelectFileForm isDisplay={resourseManager == null}>
        <_SelectFileButton onClick={() => {
          getFileText().then((value) => {
            setResourseManager(new ResourseManager(value));
          });
        }}>ファイルを選択</_SelectFileButton>
      </_SelectFileForm>

      <_TreeFrame></_TreeFrame>
      <_ContentsFrame>
        <_Header>{headerJsxList}</_Header>
        <_OutputArea>{outputAreaJsx}</_OutputArea>
      </_ContentsFrame>
    </_Frame>
  );
};

export default MainFrame;

// 選択したファイルの中身(JSON)を取得
const getFileText = async () => {
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const fileContents = await file.text();
  return JSON.parse(fileContents);
};

// 解凍
// const getDecodeText = (value: string) => {
//   const buffer = Buffer.from(value, 'base64');
//   const result = zlib.unzipSync(buffer);
//   const str = decodeURIComponent(result.toString());
//   return str;
// }

// 圧縮
// const getEncodeText = (value: string) => {
//   const content = encodeURIComponent(JSON.stringify(value));
//   const result2 = zlib.gzipSync(content);
//   const value2 = result2.toString('base64');
// }

// ファイル選択前エリア
const _SelectFileForm = styled.div<{
  isDisplay: boolean;
}>`
  display: ${props => props.isDisplay ? 'block' : 'none'};
  background-color: #0000007f;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
`;

// ファイルを選択ボタン
const _SelectFileButton = styled.div`
  display: inline-block;
  background-color:#eef5ff;
  height: 40px;
  width: 250px;
  font-size: 30px;
  text-align: center;
  border: 1px solid #919191;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;

// フレーム
const _Frame = styled.div`
  height: 100%;
  width: 100%;
  display: inline-block;
`;

// ツリーエリア
const _TreeFrame = styled.div`
  height: 100%;
  width: 200px; 
  display: inline-block;
  background-color: #f8faba;
`;

// コンテンツエリア
const _ContentsFrame = styled.div`
  height: 100%;
  width: calc(100% - 200px);  
  display: inline-block;
  vertical-align: top;
`;

// ヘッダー
const _Header = styled.div`
  height: 50px;
  width: 100%;
  background-color: #ffe1bb;
  display: inline-block;
`;

// タブ
const _Tab = styled.div<{
  isActive: boolean;
}>`
  cursor: pointer;
  background-color: ${props => props.isActive ? '#ffad42' : '#ffc06d'};
  display: inline-block;
  font-size: 25px;
  text-align: center;
  width: 100px;
  height: 40px;
  margin-left: 5px;
  margin-top: 5px;
`;

// 出力エリア
const _OutputArea = styled.div`
  height: calc(100% - 50px);
  width: 100%;
  background-color: #ffe18d;
  display: inline-block;
  padding-left: 5px;
  padding-top: 5px;
  box-sizing: border-box;
`;