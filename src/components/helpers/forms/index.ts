interface Error {
  message: string
}

export const byPropKey = (inputName: string, value: string | Error) => () => ({
  [inputName as any]: value,
})
