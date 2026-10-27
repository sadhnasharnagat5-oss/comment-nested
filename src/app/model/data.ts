import { DynamicForm } from "./dynamicform.model";

export const data:DynamicForm[]=[
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
      order: 1,
      required: true,
      placeholder: 'John'
    },
    {
      key: 'submitform',
      label: 'Submit',
      type: 'submit',
      order: 3,
      required: true,
      placeholder: 'John'
    },
    {
      key: 'address',
      label: 'Address Details',
      type: 'group',
      order: 2,
      children: [
        {
          key: 'city',
          label: 'City',
          type: 'text',
          order: 2,
          required: true
        },
        {
          key: 'zipCode',
          label: 'Zip Code',
          type: 'number',
          order: 1
        }
      ]
    }
  ];