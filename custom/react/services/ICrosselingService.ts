export interface IImages {
    imageId: string
    imageLabel: string
    imageTag: string
    imageUrl: string
}

export interface IProducts {
    productId: string
    link: string
    productName: string
    productTitle: string
    items: { images: IImages[] }[]
}



export interface ICrossSellingService {
    similars(id: string): Promise<IProducts[]>
    suggestions(id: string): Promise<IProducts[]>
    accessories(id: string): Promise<IProducts[]>
}
