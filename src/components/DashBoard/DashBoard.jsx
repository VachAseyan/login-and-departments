import { useEffect, useReducer, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Badge,
    Button,
    Card,
    Col,
    Input,
    Row,
    Space,
    Table,
    Tag,
    Tooltip,
    Select,
} from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
    ReloadOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { departmentReducer, initDepartments, ACTIONS } from '../reducer/departmentReducer';
import DepartmentModal from '../DepartmentModal/DepartmentModal';
import notification from '../../assets/photos/notification.png';
import profile from '../../assets/photos/profile.png';
import notFoundillustration from "../../assets/photos/NotFoundillustration.png";
import vector from "../../assets/photos/Vector.png";
import './DashBoard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [departments, dispatch] = useReducer(departmentReducer, [], initDepartments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        head: '',
        branches: '',
        status: 'active',
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [searchDescription, setSearchDescription] = useState('');
    const [searchHead, setSearchHead] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [tempSearchName, setTempSearchName] = useState('');
    const [tempSearchDescription, setTempSearchDescription] = useState('');
    const [tempSearchHead, setTempSearchHead] = useState('');

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('departments', JSON.stringify(departments));
    }, [departments]);

    // Filter departments
    const filteredDepartments = useMemo(() => {
        return departments.filter((dept) => {
            const matchName = dept.name.toLowerCase().includes(searchName.toLowerCase());
            const matchDesc = dept.description.toLowerCase().includes(searchDescription.toLowerCase());
            const matchHead = dept.head.toLowerCase().includes(searchHead.toLowerCase());
            const matchStatus = statusFilter ? dept.status === statusFilter : true;
            return matchName && matchDesc && matchHead && matchStatus;
        });
    }, [departments, searchName, searchDescription, searchHead, statusFilter]);

    // Action handlers
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    const openModal = (index = null) => {
        if (index !== null) {
            setFormData(departments[index]);
            setEditingIndex(index);
        } else {
            setFormData({
                name: '',
                description: '',
                head: '',
                branches: '',
                status: 'active',
            });
            setEditingIndex(null);
        }
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        if (editingIndex !== null) {
            dispatch({ type: ACTIONS.UPDATE, index: editingIndex, payload: formData });
        } else {
            dispatch({ type: ACTIONS.ADD, payload: formData });
        }
        setIsModalOpen(false);
    };

    const handleDelete = (index) => {
        dispatch({ type: ACTIONS.DELETE, index });
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Search functions
    const applySearch = () => {
        setSearchName(tempSearchName);
        setSearchDescription(tempSearchDescription);
        setSearchHead(tempSearchHead);
    };

    const resetAllFilters = () => {
        setSearchName('');
        setSearchDescription('');
        setSearchHead('');
        setStatusFilter('');
        setTempSearchName('');
        setTempSearchDescription('');
        setTempSearchHead('');
    };

    const columns = [
        {
            title: 'DEPARTMENT NAME',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <strong>{text || '-'}</strong>,
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text?.trim() ? text : '-',
        },
        {
            title: 'HEAD',
            dataIndex: 'head',
            key: 'head',
            render: (text) => text?.trim() ? text : '-',
        },
        {
            title: 'BRANCHES',
            dataIndex: 'branches',
            key: 'branches',
            render: (text) => {
                const count = Number(text);

                if (!count) {
                    return <span style={{ textDecoration: 'underline' }}>No Branches</span>;
                }

                return (
                    <span style={{
                        textDecoration: 'underline', color: '#2D6CDF',
                    }}>
                        {count} {count === 1 ? 'branch' : 'branches'}
                    </span>
                );
            },
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const isDisabled = status === 'disabled';
                return (
                    <Tag
                        className={`status-tag ${isDisabled ? 'disabled' : 'active'}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >

                        {status ? status.charAt(0).toUpperCase() + status.slice(1) : '-'}

                        {isDisabled && (
                            <Tooltip title="This department is disabled">
                                <img src={vector}
                                    style={{ marginLeft: 25, cursor: 'pointer' }}
                                />
                            </Tooltip>
                        )}
                    </Tag>
                );
            },
        },
        {
            title: '',
            key: 'actions',
            render: (_, __, index) => (
                <Space size="middle" className="action-buttons">
                    <Tooltip title="Edit">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => openModal(index)}
                            className="edit-btn"
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(index)}
                            className="delete-btn"
                        />
                    </Tooltip>
                </Space>
            ),
        }
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <Row align="middle" justify="end" gutter={12} style={{ width: '100%' }}>
                    <Col>
                        <Input
                            placeholder="Search..."
                            suffix={<SearchOutlined style={{ color: '#aaa', fontSize: '18px' }} />}
                            className="search-input"
                        />
                    </Col>
                    <Col>
                        <Tooltip>
                            <Badge size="small" className="notif-badge">
                                <img src={notification} className="notif-icon" alt="Notifications" />
                            </Badge>
                        </Tooltip>
                    </Col>
                    <Col>
                        <div className="user-avatar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Avatar
                                src={profile}
                                size={40}
                                className="user-avatar"
                            />
                            <Button danger onClick={handleLogout} className="logout-btn">
                                Logout
                            </Button>

                        </div>
                    </Col>
                </Row>
            </header>


            {departments.length > 0 ? (
                <>
                    <div className="section-header">
                        <h1>Departments</h1>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => openModal()}
                            className="create-btn"
                        >
                            Create Department
                        </Button>
                    </div>

                    <div className="search-container">
                        <div className="search-top-row">
                            <div className="search-buttons">
                                <Button
                                    icon={<SearchOutlined />}
                                    className="toggle-search-btn"
                                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                                >
                                    Search
                                </Button>
                                <Select
                                    className="status-filter"
                                    value={statusFilter || undefined}
                                    onChange={(value) => setStatusFilter(value)}
                                    placeholder="Status"
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'disabled', label: 'Disabled' },
                                    ]}
                                />
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={resetAllFilters}
                                    className="reset-btn"
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>

                        {showAdvancedSearch && (
                            <div className="search-advanced-fields">
                                <div className="search-field">
                                    <label>Department Name</label>
                                    <Input
                                        value={tempSearchName}
                                        onChange={(e) => setTempSearchName(e.target.value)}
                                        className="search-input"
                                        prefix={<SearchOutlined />}
                                    />
                                </div>

                                <div className="search-field">
                                    <label>Description</label>
                                    <Input
                                        value={tempSearchDescription}
                                        onChange={(e) => setTempSearchDescription(e.target.value)}
                                        className="search-input"
                                        prefix={<SearchOutlined />}
                                    />
                                </div>

                                <div className="search-field">
                                    <label>Head</label>
                                    <Input
                                        value={tempSearchHead}
                                        onChange={(e) => setTempSearchHead(e.target.value)}
                                        className="search-input"
                                        prefix={<SearchOutlined />}
                                    />
                                </div>

                                <Button
                                    type="primary"
                                    icon={<SearchOutlined />}
                                    className="apply-search-btn"
                                    onClick={applySearch}
                                >

                                </Button>
                            </div>
                        )}
                    </div>

                    <main className="dashboard-content">
                        <Table
                            dataSource={filteredDepartments}
                            pagination={false}
                            columns={columns}
                            className="departments-table"
                            rowClassName={(record) => (record.status === 'disabled' ? 'disabled-row' : '')}
                            scroll={{ x: 'max-content' }}
                        />

                    </main>
                </>
            ) : (
                <Card className="empty-card" style={{ textAlign: 'center', padding: '50px' }}>
                    <img
                        src={notFoundillustration}
                        alt="No departments"
                        style={{ maxWidth: '250px', marginBottom: '24px' }}
                    />
                    <h2>There are no departments</h2>
                    <p>You haven’t created any departments to your system yet.</p>
                    <Button
                        type="primary"
                        onClick={() => openModal()}
                        className='create-button'
                    >
                        Create Department
                    </Button>
                </Card>
            )}

            <DepartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalOk}
                formData={formData}
                onChange={handleChange}
                editing={editingIndex !== null}
                onBranchChange={editingIndex !== null ? (value) => handleBranchChangeImmediate(editingIndex, value) : undefined}
            />
        </div>
    );
}

export default Dashboard;