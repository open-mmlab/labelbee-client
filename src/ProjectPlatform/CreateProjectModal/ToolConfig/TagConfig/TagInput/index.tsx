import React from 'react';
import { Input as SensebeeInput } from 'antd';
import styles from './index.module.scss';

import { CloseCircleFilled, PlusCircleFilled, StarFilled } from '@ant-design/icons';
import { Checkbox, Col, Input, Row } from 'antd';
const InputGroup = Input.Group;

interface IProps {
  inputInfo: IInputList;
  isAllReadOnly: boolean;
  changeInputInfo: any;
  addInputInfo: any;
  deleteInputInfo: any;
  inputIndex: number; // 用于表示当前是第几个配置
}

export interface IInputList {
  isMulti?: Boolean;
  key: string;
  value: string;
  subSelected?: IInfoList[];
}

interface IInfoList {
  isDefault?: any;
  key: string;
  value: string;
}

const Index = (props: IProps) => {
  const {
    inputInfo,
    isAllReadOnly,
    changeInputInfo,
    addInputInfo,
    deleteInputInfo,
    inputIndex,
  } = props;

  const stopPropagation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <div key={`inputList_${inputIndex}`}>
      <Row className={styles.select}>
        <Col span={1} className={styles.inputSerial}>
          {inputIndex + 1}
        </Col>
        <Col span={16}>
          <InputGroup compact={true} className={styles.inputGroup}>
            <SensebeeInput
              className={styles.input_single}
              value={inputInfo.key}
              placeholder='类别'
              onChange={e => changeInputInfo(e, 'key', inputIndex)}
              onKeyDown={stopPropagation}
              disabled={isAllReadOnly}
            />
            <SensebeeInput
              className={styles.input_single}
              value={inputInfo.value}
              placeholder='值'
              onChange={e => changeInputInfo(e, 'value', inputIndex)}
              onKeyDown={stopPropagation}
              disabled={isAllReadOnly}
            />
          </InputGroup>
        </Col>
        <Col span={7}>
          <div className={styles.headerOption}>
            <Checkbox
              className={`${
                inputInfo.isMulti === true ? styles.checkboxSelected : styles.checkboxUnselected
              } ${styles.icon}`}
              checked={true}
              onChange={e => !isAllReadOnly && changeInputInfo(e, 'isMulti', inputIndex)}
            />
            {!isAllReadOnly && (
              <a className={styles.addIcon} onClick={() => addInputInfo(inputIndex)}>
                <PlusCircleFilled />
              </a>
            )}
            {inputIndex > 0 && !isAllReadOnly && (
              <a className={styles.deleteIcon} onClick={() => deleteInputInfo(inputIndex)}>
                <CloseCircleFilled />
              </a>
            )}
          </div>
        </Col>
      </Row>

      {inputInfo.subSelected && (
        <div className={styles.subMain}>
          {inputInfo.subSelected.map((subInfo, j) => (
            <Row className={styles.subSelect} key={j}>
              <Col span={17} className={styles.firstItem}>
                <SensebeeInput
                  className={styles.sub_input}
                  value={subInfo.key}
                  placeholder='类别'
                  onChange={e => changeInputInfo(e, 'key', inputIndex, j)}
                  disabled={isAllReadOnly}
                  onKeyDown={stopPropagation}
                />
                <SensebeeInput
                  className={styles.sub_input}
                  value={subInfo.value}
                  placeholder='值'
                  onChange={e => changeInputInfo(e, 'value', inputIndex, j)}
                  disabled={isAllReadOnly}
                  onKeyDown={stopPropagation}
                />
              </Col>
              <Col span={7} className={styles.headerOption}>
                <div
                  className={`
                        ${styles.star}
                        ${subInfo.isDefault ? styles.starSelected : styles.starUnselected} 
                      `}
                  onClick={e => !isAllReadOnly && changeInputInfo(e, 'isDefault', inputIndex, j)}
                >
                  <StarFilled style={{ width: 16, height: 16 }} />
                </div>
                {!isAllReadOnly && (
                  <a
                    style={{
                      color: '#CCCCCC',
                    }}
                    onClick={() => deleteInputInfo(inputIndex, j)}
                  >
                    <CloseCircleFilled />
                  </a>
                )}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
