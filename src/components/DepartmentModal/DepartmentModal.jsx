import { useState } from 'react';
import { Modal, Input, Select } from 'antd';
import './DepartmentModal.css';

const { TextArea } = Input;
const { Option } = Select;


const departmentHeads = [
    'Vache Aseyan',
    'Gevorg Gevorgyan',
    'Poxos Poxosyan',
    'Samvel Harutyunyan',
    'Karapet Karapetyan',
    'Ani Serobyan',
    'Lilit Hakobyan',
    'Armen Sargsyan',
    'Narek Maetvosyan',
    'Arman Vardanyan',
];

function DepartmentModal({
    isOpen,
    onClose,
    onSubmit,
    formData,
    onChange,
    editing,
}) {
    const [nameError, setNameError] = useState('');

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            setNameError('Department name is required');
            return;
        }
        setNameError('');
        onSubmit();
    };

    return (
        <Modal
            className="modal"
            title={editing ? 'Edit Department' : 'Create Department'}
            open={isOpen}
            closable={false}
            footer={null}
            onCancel={onClose}
        >
            <div className="modal-content">
                <div className="modal-section">
                    <label className="modal-label">
                        Department name <span className="required">*</span>
                    </label>
                    <Input
                        placeholder="Enter department name"
                        value={formData.name}
                        onChange={(e) => {
                            onChange('name', e.target.value);
                            if (e.target.value.trim()) setNameError('');
                        }}
                        status={nameError ? 'error' : ''}
                        style={{ width: '360px' }}
                    />
                    {nameError && <div className="error-text">{nameError}</div>}
                </div>

                <div className="modal-section">
                    <label className="modal-label">
                        Description <span className="optional">(optional)</span>
                    </label>
                    <TextArea
                        placeholder="Describe department"
                        value={formData.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        maxLength={100}
                        rows={3}
                        style={{ width: '360px' }}
                    />
                    <div className="char-limit">
                        {formData.description.length}-100 characters
                    </div>
                </div>

                <div className="modal-section">
                    <label className="modal-label">
                        Department Head <span className="optional">(optional)</span>
                    </label>
                    <Select
                        placeholder="Select department head"
                        value={formData.head || undefined}
                        onChange={(value) => onChange('head', value)}
                        style={{ width: '360px' }}
                        allowClear
                    >
                        {departmentHeads.map((name) => (
                            <Option key={name} value={name}>
                                {name}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className="modal-section">
                    <label className="modal-label">
                        Branches <span className="optional">(optional)</span>
                    </label>
                    <Input
                        placeholder="Enter Branch Name"
                        value={formData.branches}
                        onChange={(e) => onChange('branches', e.target.value)}
                        style={{ width: '360px' }}
                    />
                </div>

                <div className="modal-section">
                    <label className="modal-label">Status</label>
                    <Select
                        value={formData.status}
                        onChange={(value) => onChange('status', value)}
                        style={{ width: '360px' }}
                    >
                        <Option value="active">Active</Option>
                        <Option value="disabled">Disabled</Option>
                    </Select>
                </div>

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={!formData.name.trim()}
                    >
                        {editing ? 'Create' : 'Next'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DepartmentModal;
