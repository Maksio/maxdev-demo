import {defineStore} from 'pinia'
import {computed} from "vue";

const makeRequest = async (ip: string) => {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    return response.json();
}

type IpResponse = {
    city: string;
    country: string;
    query: string;
}

type IpInfo = {
    time: string;
    ip: string;
    country: string;
    city: string;
}

type Sorting = {
    field: string;
    direction: string;
}

export const useIpStore = defineStore('iplist', {
    state: () => {
        return {
            ipItems: [] as IpInfo[],
            sortBy: 'country',
            sortOrder: 'desc',
        }
    },
    getters: {
        sortedList: (state) => {
           const key = state.sortBy as keyof IpInfo || 'time';
           const dir = state.sortOrder == 'asc' ? -1 : 1;
            console.log(state.ipItems)
            state.ipItems.sort((a, b) => { console.log('sorting', a, b); return 0} );
           return state.ipItems.sort((a: IpInfo, b: IpInfo) => a[key].localeCompare(b[key]) * dir)
       },
        listEmpty: (state) => state.ipItems.length === 0

    },
    actions: {
        async search(payload: string[]) {
            if (!Array.isArray(payload)) return;

            const queue: Promise<string>[] = [];

            payload.forEach(ip => queue.push(makeRequest(ip)));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const results = await Promise.all(queue);

            results.forEach((el: string) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { query, city, country } = el;
                this.ipItems.push({ time: String(+Date.now()), ip: query, city, country })
            });
        },
        sort(payload: Sorting) {
            const { field, direction } = payload;
            this.sortBy = field;
            this.sortOrder = direction;
        }
    },
})