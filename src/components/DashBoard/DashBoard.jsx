import { useEffect, useMemo, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Badge,
    Button,
    Card,
    Col,
    Empty,
    Input,
    Popconfirm,
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
} from '@ant-design/icons';

import notification from '../../assets/photos/notification.png';
import profile from '../../assets/photos/profile.png';
import notFoundillustration from "../../assets/photos/NotFoundillustration.png";

import DepartmentModal from '../DepartmentModal/DepartmentModal';
import './Dashboard.css';

const ACTIONS = {
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD:
            return [...state, action.payload];
        case ACTIONS.UPDATE:
            return state.map((dept, idx) =>
                idx === action.index ? action.payload : dept
            );
        case ACTIONS.DELETE:
            return state.filter((_, idx) => idx !== action.index);
        default:
            return state;
    }
}

function init() {
    try {
        const saved = localStorage.getItem('departments');
        if (saved) {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        }
        return [];
    } catch (error) {
        console.error('Error loading departments from localStorage:', error);
        return [];
    }
}

function Dashboard() {
    const navigate = useNavigate();
    const [departments, dispatch] = useReducer(reducer, [], init);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        head: '',
        branches: '',
        status: 'active',
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [showLogout, setShowLogout] = useState(false);

    const [searchName, setSearchName] = useState('');
    const [searchDescription, setSearchDescription] = useState('');
    const [searchHead, setSearchHead] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [tempSearchName, setTempSearchName] = useState('');
    const [tempSearchDescription, setTempSearchDescription] = useState('');
    const [tempSearchHead, setTempSearchHead] = useState('');

    useEffect(() => {
        localStorage.setItem('departments', JSON.stringify(departments));
    }, [departments]);

    const filteredDepartments = useMemo(() => {
        return departments.filter((dept) => {
            const matchName = dept.name.toLowerCase().includes(searchName.toLowerCase());
            const matchDesc = dept.description.toLowerCase().includes(searchDescription.toLowerCase());
            const matchHead = dept.head.toLowerCase().includes(searchHead.toLowerCase());
            const matchStatus = statusFilter ? dept.status === statusFilter : true;
            return matchName && matchDesc && matchHead && matchStatus;
        });
    }, [departments, searchName, searchDescription, searchHead, statusFilter]);

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
        setShowLogout(false);
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
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

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
        setShowAdvancedSearch(false);
    };

    const columns = [
        {
            title: 'DEPARTMENT NAME',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'HEAD',
            dataIndex: 'head',
            key: 'head',
        },
        {
            title: 'BRANCHES',
            dataIndex: 'branches',
            key: 'branches',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
            ),
        },
        {
            title: '',
            key: 'actions',
            render: (_, __, index) => (
                <Space size="middle">
                    <p
                        style={{ cursor: 'pointer', color: '#1890ff', margin: 0 }}
                        onClick={() => openModal(index)}
                    >
                        ...
                    </p>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(index)}
                    />
                </Space>
            ),
        },

    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <Row align="middle" justify="end" gutter={16} style={{ width: '100%' }}>
                    <Col>
                        <Input
                            placeholder="Search..."
                            suffix={<SearchOutlined style={{ color: '#aaa', fontSize: '18px' }} />}
                            className="search-input"
                        />
                    </Col>
                    <Col>
                        <Tooltip title="Notifications">
                            <Badge size="small" className="notif-badge">
                                <img src={notification} className="notif-icon" alt="Notifications" />
                            </Badge>
                        </Tooltip>
                    </Col>
                    <Col>
                        <div className="user-avatar-container">
                            <Avatar
                                src={profile}
                                size={40}
                                onClick={() => setShowLogout((prev) => !prev)}
                                className="user-avatar"
                            />
                            {showLogout && (
                                <Button danger onClick={handleLogout} className="logout-btn">
                                    Logout
                                </Button>
                            )}
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
                            bordered
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
            />
        </div>
    );
}

export default Dashboard;