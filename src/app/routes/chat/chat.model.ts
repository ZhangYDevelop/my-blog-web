export class ChatMessage {

    /**
     * 消息类型，用户自定义消息类别
     */
    public id?: string;

    /**
     * 消息类型，用户自定义消息类别
     */
    public action?: string;

    /**
     * 消息标题
     */
    public title?: string;

    /**
     * 消息类容，于action 组合为任何类型消息，content 根据 format 可表示为 text,json ,xml数据格式
     */
    public content?: string;

    /**
     * 消息发送者账号
     */
    public sender?: string;

    /**
     * 消息发送者接收者
     */
    public receiver?: string;


    /**
     * content 内容格式
     */
    public format?: string;

    /**
     * 附加内容 内容
     */
    public extra?: string;

    /**
     * 时间戳
     */
    public timestamp?: any;

}
