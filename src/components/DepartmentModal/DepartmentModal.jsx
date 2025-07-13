import { useState } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './DepartmentModal.css';
import correct from "../../assets/photos/correct.png"

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
    onBranchChange,
}) {
    const [nameError, setNameError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            setNameError('Department name is required');
            return;
        }
        setNameError('');
        onSubmit();
        setShowSuccessModal(true);
    };

    const handleSuccessOk = () => {
        setShowSuccessModal(false);
        onClose();
    };

    return (
        <>
            <Modal
                className="modal"
                title={editing ? 'Edit Department' : 'Create Department'}
                open={isOpen && !showSuccessModal}
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
                            type="number"
                            min={0}
                            placeholder="Enter number of branches"
                            value={formData.branches}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^[0-9\b]+$/.test(val)) {
                                    onChange('branches', val);  // update modal state
                                    if (onBranchChange) onBranchChange(val);  // update Dashboard state immediately
                                }
                            }}
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

            <Modal
                open={showSuccessModal}
                footer={[
                    <Button key="ok" type="primary" onClick={handleSuccessOk} className="success-btn">
                        Ok, thanks
                    </Button>,
                ]}
                closable={false}
                onCancel={handleSuccessOk}
                className="success-modal"
            >
                <div className="success-modal-content">
                    <img
                        src={correct}
                        alt="Correct"
                        className="success-image"
                    />
                    <h2 className="success-title">Your “{formData.name}” department was created!</h2>
                    <p className="success-text">
                        You successfully created a new department.
                        <br />
                        Now you can add members and work
                        <br />
                        efficiently.
                    </p>
                </div>
            </Modal>

        </>
    );
}

export default DepartmentModal;