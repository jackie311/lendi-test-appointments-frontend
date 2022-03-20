export const sortByDate = (field: string) => (a: any, b: any) => {
  const newDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${month}/${day}/${year}`;
  }
  return new Date(newDate(b[field])).valueOf() - new Date(newDate(a[field])).valueOf();
}

export const sortByField = (field: string) => (a:any, b:any) => a[field] - b[field];