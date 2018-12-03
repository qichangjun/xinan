export interface RescueData {
    id: string;
    title: string;
    image: string;
    name: string;
    price: string;
    rescueDate: string;
    introduce: string;
}

export interface GivingData {
    id: string;
    title: string;
    image: string;
    number: number;
    price: string;
    introduce: string;
    data: Array<object>;
}

export interface PublicData {
    id: string;
    title: string;
    image: string;
    number: number;
    price: string;
    introduce: string;
    rescueDate: string;
}
export interface XAGivingData {
    id: string;
    title: string;
    image: string;
    data: Array<object>;
}
export interface ProblemData {
    id: string;
    data: Array<object>;
}
export interface ShopData {
    id: string;
    title: string;
    imageurl: string;
    price: string;
}

export interface CardShops {
    id: string;
    title: string;
    url: string;
    data?: Array<object>;
}
export interface IntegralData {
    imgUrl: string;
    name: string;
    price: string;
}

export interface ShopCardData {
    id: string;
    title: string;
    imageurl: string;
    originalPrice: string;
    discountPrice: string;
    isSelected: Number;
    isFailure: Number;
}
export interface WaitData {
    id: string;
    name: string;
    title: string;
    lable: string;
    content: string;
    buttonA: string;
    buttonB: string;
    order: string;
    orderTime: string;
}
export interface OrderData {
    id: string;
    name: string;
    title: string;
    lable: string;
    content: string;
    buttonA: string;
    buttonB: string;
    order: string;
    orderTime: string;
}

export interface DonationedData {
    id: string;
    title: string;  // 标题
    name?: string;   // 姓名
    imgUrl: string; // 头像
    state: number; // 审核状态
    urlObj: object; // 跳转路径参数
    list: Array<object>; // 中间列表展示
    content: string; // 内容详情
    jjxx?: Array<object>;   // 底部标签列表
}
