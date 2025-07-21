export interface Account {
  id: string
  tags: { text: string }[]
  type: 'LDAP' | 'Local'
  login: string
  password?: string | null
}

export interface AccountWithFields extends Account {
  tagsText?: string
  errors?: {
    tags?: string
    type?: string
    login?: string
    password?: string
  }
} 