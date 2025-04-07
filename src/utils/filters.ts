export type Filter = { (data: string): string };

export function pageCountFilter(data: string): string {
    const parsedData = JSON.parse(data);
    parsedData.items = parsedData.items.filter((item: any) => item.pageCount < 100);
    return JSON.stringify(parsedData);
}

export function toUpperCaseFilter(data: string): string {
    data = data.toUpperCase();
    return data;
}

export function removeBlanks(data: string): string {
    return data.replace(/\s+/g, "");
}