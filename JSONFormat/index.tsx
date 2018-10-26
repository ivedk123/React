import React from 'react'
import less from './index.less'

export default class App extends React.Component<{
    JSONObject: any,
    //是否需要逗号分隔
    split?: boolean,
    //是否转换成JSON字符串(key加双引号)
    JSONToString?: boolean,
}>{
    state = {
        toJSONOk: false
    }
    public getEL = (object: any) => {
        const { split: isSplit, JSONToString } = this.props;
        let result;
        if (object instanceof Array) {
            result = (
                <span key="JSONArray">
                    <span key="[" className={less.borderLine}>[</span>
                    {object.map((o, index) => {
                        let split = isSplit ? ',' : ''
                        if (index === object.length - 1) split = '';
                        return <div style={{ marginLeft: 15 }} key={index}>{this.getEL(o)}<span className={less.borderLine}>{split}</span></div>;
                    })}
                    <span key="]" className={less.borderLine}>]</span>
                </span>
            )
        } else if (typeof object === "function") {
            result = (
                <span key="function" className={less.function}>
                    {`"${object.constructor}"`}
                </span>
            )
        } else if (object instanceof Object) {
            result = (
                <span key="JSONObject">
                    <span key="{"><span className={less.borderLine}>{'{'}</span></span>
                    {Object.keys(object).map((k, index, arr) => {
                        let split = isSplit ? ',' : ''
                        let quot = JSONToString ? `"` : '';
                        if (index === arr.length - 1) split = '';
                        return (
                            <div key={k} className={less.left4}>
                                <span className={less.objectKey}>
                                    <span className={less.borderLine}>{quot}</span>
                                    {k}
                                    <span className={less.borderLine}>{quot}</span>
                                    <span style={{ marginLeft: 5 }}>:</span>
                                </span>
                                {this.getEL(object[k])}
                                <span className={less.borderLine}>
                                    {split}
                                </span>
                            </div>
                        )
                    })}
                    <span key="}"><span className={less.borderLine}>{'}'}</span></span>
                </span>
            )
        } else {
            if (typeof object === "undefined") {

                result = (
                    <span key="undefined" className={less.undefined}>
                        undefined
                    </span>
                )
            }
            if (typeof object === "boolean") {
                result = (
                    <span key="boolean" className={less.boolean}>
                        {object + ""}
                    </span>
                )
            }
            if (typeof object === "number") {
                result = (
                    <span key="number" className={less.number}>
                        {object + ""}
                    </span>
                )
            }
            if (typeof object === "string") {
                result = (
                    <span key="string">
                        <span key="1" className={less.borderLine}>"</span>
                        <span key="2" className={less.string}>{object}</span>
                        <span key="3" className={less.borderLine}>"</span>
                    </span>
                )
            }
            if (object === null) {
                result = (
                    <span key="null" className={less.null}>
                        null
                    </span>
                )
            }
        }
        return <span className={less.root}>{result}</span>;
    }

    public render() {
        const { JSONObject } = this.props;
        return this.getEL(JSONObject)
    }
}