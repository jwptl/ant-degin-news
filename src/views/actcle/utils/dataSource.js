const columns = {}

columns.index = [
    {
        title: '序号',
        dataIndex: 'sortIndex',
    },
    {
        title: '标题',
        dataIndex: 'new_title',
        key: 'id',
    },
    {
        title: '来源',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' },
    },
    {
        title: '所属分类',
        dataIndex: 'news_class_name',
    },
    {
        title: '作者',
        dataIndex: 'new_author',
    },
    {
        title: '操作时间',
        dataIndex: 'create_time',
        scopedSlots: { customRender: 'create_time' },
    },
    {
        title: '状态',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' },
    },
    {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

columns.itemize = [
    {
        title: '序号',
        dataIndex: 'sortIndex',
    },
    {
        title: '分类名称',
        dataIndex: 'news_class_name',
       
    },
    {
        title: '分类简介',
        dataIndex: 'news_content',
    },
    {
        title: '创建人',
        dataIndex: 'username',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        scopedSlots: { customRender: 'create_time' },
    },
    {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default columns