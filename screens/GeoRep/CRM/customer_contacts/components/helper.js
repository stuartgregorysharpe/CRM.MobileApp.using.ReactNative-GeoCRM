
export function getFormData(contactInfo) {

    return {        
        contact_name: contactInfo != undefined ? contactInfo.contact_name : '',
        contact_surname:  contactInfo != undefined ? contactInfo.contact_surname :'',
        contact_email:  contactInfo != undefined ? contactInfo.contact_email :'',
        contact_cell: contactInfo != undefined ? contactInfo.contact_cell :'',
        additional_number: contactInfo != undefined ? contactInfo.additional_number : ''        
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
            field_type: 'email',
            field_name: 'contact_email',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Email',
            value: ''
        },
        {
            key:4,
            field_type: 'numbers',
            field_name: 'contact_cell',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Mobile Number',
            value: ''
        },
        {
            key:5,
            field_type: 'numbers',
            field_name: 'additional_number',
            initial_value: '',
            editable: "1",
            is_required: true,
            field_label: 'Additional Number',
            value: ''
        }
        
    ];
}


