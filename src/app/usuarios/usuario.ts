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

export interface UsuarioDetalhes {
    id: string,
    title: string,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    dateOfBirth: string,
    registerDate: string,
    phone: string,
    picture: string,
    location: Location
}

export interface Location {
    street: string,
    city: string,
    state: string,
    country: string,
    timezone: string
}