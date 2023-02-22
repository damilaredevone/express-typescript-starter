export type User = {
  firstname?: string
  lastname?: string
  email?: string
  phone?: number | string
  password?: string
}

export type Profile = {
  profile: {
    dob?: string
    address?: string
    state?: string
    lga?: string
  }
}

export type UpdateProfile = User & Profile
