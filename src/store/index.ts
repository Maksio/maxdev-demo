import {defineStore} from 'pinia'
import {ElMessage} from "element-plus";

const makeRequest = async (ip: string) => {
    let response;
    try {
        response = await fetch(`http://ip-api.com/json/${ip}`);
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error('API error', error);
    }
    return Promise.reject(response);
}

export type IpState = 'success' | 'busy' | 'fail';
export type IpInfo = {
    time: string;
    ip: string;
    country: string;
    city: string;
    state: IpState;
}

type Sorting = {
    field: string;
    direction: string;
}

export const useIpStore = defineStore('iplist', {
    state: () => {
        return {
            items: [] as IpInfo[],
            sortBy: 'country',
            sortOrder: 'desc',
            filterValue: '',
        }
    },
    getters: {
        sortedList: (state) => {
            const key = state.sortBy as keyof IpInfo || 'time';
            const dir = state.sortOrder == 'asc' ? -1 : 1;

            const sorted = state.items.sort((a: IpInfo, b: IpInfo) => a[key].localeCompare(b[key]) * dir);

            if (state.filterValue) {
                return sorted.filter((row: IpInfo) => row.ip.includes(state.filterValue));
            }
            return sorted;
        },
        presentIps: (state) => state.items.map((item: IpInfo) => item.ip),
        listEmpty: (state): boolean => state.items.length === 0,
    },
    actions: {
        async search(payload: string[]) {
            if (!Array.isArray(payload)) return;

            const queue: Promise<string>[] = [];
            const presented = this.presentIps;
            [...new Set(payload)].forEach(ip => {
                if (!presented.includes(ip))
                {
                    queue.push(makeRequest(ip))
                }
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const results = await Promise.all(queue);

            results.forEach((el: string) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const {query, city, country} = el;
                const randomInt = query.split('.').reduce((a: string, b: string) => Number(a) + Number(b)) % 3;
                const states: IpState[] = ['success', 'busy', 'fail'];
                const state: IpState = states[randomInt];

                ElMessage({
                    message: `IP ${query} was added to table`,
                    type: 'success',
                })

                this.items.push({time: String(+Date.now()), ip: query, city, country, state})
            });
        },
        sort(payload: Sorting) {
            const {field, direction} = payload;
            this.sortBy = field;
            this.sortOrder = direction;
        },
        deleteIp(ip: string) {
            this.items = this.items.filter((row: IpInfo) => row.ip !== ip);
        },
        filter(search: string) {
            this.filterValue = search;
        },
        getIpInfo(ip?: string) {
            return ip && this.items.filter((item: IpInfo) => item.ip === ip).pop();
        }
    },
})
