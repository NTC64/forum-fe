import { defineStore } from 'pinia'

export const useMenu = defineStore('menuId', {

    state: () => ({

        selectedKeys: [1],
        openKeys: [],
    }),
    actions: {
        onSelectedKeys(data) {
            this.selectedKeys[0] = data;
            console.log(this.selectedKeys)
        },
        onOpenKeys(data) {
            this.openKeys = data;
        }
    }

})