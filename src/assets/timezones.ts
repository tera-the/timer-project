export type TimezoneData = {
    city: string
    timezone: string
    offset: string
}

export const timezones: TimezoneData[] = [
    {
        city: "Tokyo",
        timezone: "Asia/Tokyo",
        offset: "UTC +9",
    },
    {
        city: "New York",
        timezone: "America/New_York",
        offset: "UTC -4",
    },
    {
        city: "London",
        timezone: "Europe/London",
        offset: "UTC +1",
    },
    {
        city: "Almaty",
        timezone: "Asia/Almaty",
        offset: "UTC +6",
    },
]