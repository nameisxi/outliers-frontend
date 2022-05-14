import { Row, Col, Form, InputNumber, Select } from 'antd';

const { Option } = Select;


function CompensationField(props) {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
      
    return (
        <Form.Item
            name={`${props.compensationName}_compensation`}
            label={`${capitalizeFirstLetter(props.compensationName)} compensation`}
        >
            <Row>
                <Col span={8}>
                    <Form.Item
                        name={`${props.compensationName}_compensation_min`}
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber min={0} prefix='Min:' style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={2} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <p>-</p>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name={`${props.compensationName}_compensation_max`}
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                required: false,
                            },
                        ]}
                    >
                        <InputNumber min={0} prefix='Max:' style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={5}>
                    <Form.Item name={`${props.compensationName}_compensation_currency`}>
                        <Select 
                            defaultValue='usd'
                            onChange={props.handleOnChange}
                            style={{ width: '100%' }}
                        >
                            <Option value="usd">USD</Option>
                            <Option value="eur">EUR</Option>
                            <Option value="krw">KRW</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>   
        </Form.Item>
    );
}

export default CompensationField;