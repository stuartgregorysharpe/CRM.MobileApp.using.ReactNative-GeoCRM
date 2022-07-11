
export function getFormData() {
    return {        
        contact_name: '',
        contact_surname: '',
        contact_cell: '',
        contact_email: '',        
    };
}

export function getFormStructureData() {

    return [
        {
            key:1,
            field_type: 'text',
            field_name: 'contact_name',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Name',
            value: ''
        },
        {
            key:2,
            field_type: 'text',
            field_name: 'contact_surname',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Surname',
            value: ''
        },
        {
            key:3,
            field_type: 'text',
            field_name: 'contact_cell',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Mobile Number',
            value: ''
        },
        {
            key:4,
            field_type: 'text',
            field_name: 'contact_email',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Email',
            value: ''
        }
    ];
}


