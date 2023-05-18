export interface Usuario {
    firstName: string,
    id: string,
    lastName: string,
    picture: string,
    title: string
}

export interface Retorno {
    data: Usuario[],
    limit: number,
    page: number,
    total: number
}