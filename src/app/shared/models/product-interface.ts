
export interface Iproduct{
    pname: string;
    pstatus: "In-progress" | "Dispatched" | "Delivered";
    id: string;
    canReturn: 0 | 1;
    pFeature: string;
    pimgUrl: string; 
}