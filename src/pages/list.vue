<template>
  <v-container style="width: 65%;">
    <v-row class="bg-grey-lighten-4 my-8 py-8">
      <v-col cols="12" >
            <h1 class="text-center" style="color:#262626;">新增事項</h1>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="10" class="bg-grey-lighten-4">
        <v-text-field
          variant="outlined"
          label="新增事項"
          clearable
          append-icon="mdi-plus"
          @keydown.enter="onInputSubmit"
          @click:append="onInputSubmit"
          v-model="newItem"
          :rules="[rules.required, rules.length]"
          ref="newItemTextField"
          color="error"
        ></v-text-field>
        <v-col cols="12" >
            <h1 class="text-center" style="color:#262626;">代辦事項</h1>
        </v-col>
        <v-table>
          <thead style="background-color:#ff9865;">
            <tr>
              <th style="color:#262626;" class="text-h5 font-weight-bold text-center">名稱</th>
              <th style="color:#262626;" class="text-h5 font-weight-bold text-center">操作</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item, i) in items" :key="item.id" style="background-color:#fcd3ac; ">
              <td style="color:#262626;" class="font-weight-bold text-h6">
                <span v-show="!item.edit" >{{ item.name }}</span>
                <v-text-field
                  v-show="item.edit"
                  v-model="item.model"
                  :rules="[rules.required, rules.length]"
                  autofocus
                  @keydown.enter="onEditInputSubmit(item.id, i)"
                  ref="editItemTextField"
                ></v-text-field>
              </td>
              <td >
                <template v-if="!item.edit" >
                  <v-btn icon="mdi-pencil" @click="editItem(item.id)" class="bg-grey-darken-1 mx-1 my-2"></v-btn>
                  <v-btn icon="mdi-delete" @click="delItem(item.id)" class="bg-grey-darken-1 mx-1 my-2"></v-btn>
                </template>
                <template v-else>
                  <v-btn icon="mdi-check" @click="onEditInputSubmit(item.id, i)" class="bg-grey-darken-1 mx-1 my-2"></v-btn>
                  <v-btn icon="mdi-undo" @click="cancelEditItem(item.id)" class="bg-grey-darken-1 mx-1 my-2"></v-btn>
                </template>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12" >
        <h1 class="text-center" style="color:#262626;" >完成事項</h1>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="10" class="bg-grey-lighten-4">
        <v-table>
          <thead >
            <tr style="background-color:#ff9865;">
              <th style="color:#262626;" class="text-h5 font-weight-bold text-center ">名稱</th>
              <th style="color:#262626;" class="text-h5 font-weight-bold text-center">操作</th>
            </tr>
          </thead>
          <tbody class="text-center font-weight-bold text-h6" >
            <tr v-for="item in finishedItems" :key="item.id" style="background-color:#fcd3ac;color:#262626;">
              <td>{{ item.name }}</td>
              <td>
                <v-btn variant="text"></v-btn>
                <v-btn icon="mdi-delete" @click="delFinishItem(item.id)" class="bg-grey-darken-1 mx-1 my-2"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useListStore } from '@/stores/list'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '番茄鐘 | 清單'
  }
})

const list = useListStore()
const { addItem, editItem, delItem, cancelEditItem, confirmEditItem, delFinishItem } = list
const { items, finishedItems } = storeToRefs(list)

const newItem = ref('')
const newItemTextField = ref(null)
const editItemTextField = ref([])

const rules = {
  required: (value) => {
    return Boolean(value) || '欄位必填'
  },
  length: (value) => {
    return value.length >= 3 || '必須三個字以上'
  }
}

const onInputSubmit = async () => {
  const validate = await newItemTextField.value.validate()
  console.log(validate)
  if (validate.length > 0) return
  addItem(newItem.value)
  newItemTextField.value.reset()
}

const onEditInputSubmit = async (id, i) => {
  const validate = await editItemTextField.value[i].validate()
  if (validate.length > 0) return
  confirmEditItem(id)
}
</script>
