import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddStudent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Location from './Location';

const AddStudent = ({ token }) => {
	const [name, setName] = useState('');
	const [studentSCode, setStudentCode] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [identifyCard, setIdentifyCard] = useState('');
	const [address, setAddress] = useState('');
	// const [addressLive, setAddressLive] = useState('');
	const [birthday, setBirthday] = useState('');
	const [major, setMajor] = useState('');
	const [nation, setNation] = useState('');
	const [gender, setGender] = useState('');
	const [avatar, setAvatar] = useState('');
	const [religion, setReligion] = useState('');
	const [validation, setValidation] = useState(false);
	const [error, setError] = useState(null);

	let history = useNavigate();
	console.log(birthday + ' 00:00:00');

	const handleSubmit = async (e) => {
		e.preventDefault();
		addStudent();
	};

	const addStudent = async () => {
		try {
			await axios
				.post(
					'http://localhost:9090/dbProcedure/create/7B52F3BADA004506B403C5F8793D557D',
					{
						STUDENTNAME: name,
						MSSV: studentSCode,
						EMAIL: email,
						PHONE: phoneNumber,
						CMND: identifyCard,
						QUEQUANTINH: 1,
						QUEQUANHUYEN: 0,
						QUEQUANXA: 0,
						QUEQUANDIACHI: address,
						NOIOTINH: 10,
						NOIOHUYEN: 0,
						NOIOXA: 0,
						NOIODIACHI: 'Ha Noi',
						NGAYSINH: birthday + ' 00:00:00',
						CHUYENNGANH: major,
						DANTOC: nation,
						TONGIAO: religion,
						GIOITINH: 1,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					},
				)
				.then((res) => {
					console.log(res.data);
					toast.success('add success', {
						position: toast.POSITION.BOTTOM_LEFT,
					});
					history('/');
				});
		} catch (error) {
			console.error(error.message);
		}
	};

	const cancelAdd = () => {
		history('/');
	};

	function isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	}
	const handleChangeEmail = (event) => {
		if (!isValidEmail(event.target.value)) {
			setError('Email không đúng định dạng');
		} else {
			setError(null);
		}

		setEmail(event.target.value);
	};

	const uploadImg = (e) => {
		const file = e.target.files;
		if (file && file.length > 0) {
			setAvatar(file[0]);
		}
	};
	console.log(address);
	return (
		<div>
			<h1 className='text-center pt-5'>CREATE STUDENT</h1>

			<Form className='d-flex flex-column justify-content-center align-items-center'>
				<div
					className='d-grid gap-2'
					style={{ margin: '3%', gridTemplateColumns: '50% 50%' }}
				>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Họ tên</Form.Label>
						<Form.Control
							type='text'
							placeholder='Họ và tên'
							required
							onMouseDown={(e) => setValidation(true)}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
						{name.length == 0 && validation && (
							<span
								className='text-danger'
								style={{ fontSize: '13px', marginLeft: '5px' }}
							>
								Nhập họ và tên
							</span>
						)}
					</Form.Group>
					<Form.Group className='mb-3' controlId='formS'>
						<Form.Label>Mã sinh viên</Form.Label>
						<Form.Control
							type='text'
							placeholder='Mã sinh viên'
							required
							onChange={(e) => setStudentCode(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Email'
							required
							onChange={handleChangeEmail}
						></Form.Control>
						{error && (
							<span
								className='text-danger'
								style={{ fontSize: '13px', marginLeft: '5px' }}
							>
								{error}
							</span>
						)}
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Số điện thoại</Form.Label>
						<Form.Control
							type='tel'
							placeholder='Số điện thoại'
							pattern='[0][0-9]{9}'
							required
							onChange={(e) => setPhoneNumber(e.target.value)}
						></Form.Control>
						{phoneNumber.length > 0 && !phoneNumber.match('[0][0-9]{9}') && (
							<span
								className='text-danger'
								style={{ fontSize: '13px', marginLeft: '5px' }}
							>
								Vui lòng nhập đúng định dạng
							</span>
						)}
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>CMND/CCCD</Form.Label>
						<Form.Control
							type='number'
							placeholder='So cmnd/cccd'
							onChange={(e) => setIdentifyCard(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Location setAddress={setAddress} />
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Ngày sinh</Form.Label>
						<Form.Control
							type='date'
							onChange={(e) => setBirthday(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Chuyên ngành</Form.Label>
						<Form.Control
							type='text'
							placeholder='Chuyên ngành'
							onChange={(e) => setMajor(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Dân tộc</Form.Label>
						<Form.Control
							type='text'
							placeholder='Dân tộc'
							onChange={(e) => setNation(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Tôn giáo</Form.Label>
						<Form.Control
							type='text'
							placeholder='Tôn giáo'
							onChange={(e) => setReligion(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Giới tính</Form.Label>
						<Form.Select onChange={(e) => setGender(e.target.value)}>
							<option value='Nam'>Nam</option>
							<option value='Nữ'>Nữ</option>
							<option value='Không xác định'>Không xác định</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formName'>
						<Form.Label>Ảnh chân dung</Form.Label>
						<Form.Control
							type='file'
							onChange={(e) => uploadImg(e)}
						></Form.Control>
						{avatar && (
							<div
								style={{
									marginTop: 50,
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<img
									style={{ maxWidth: '300px', maxHeight: 320 }}
									src={URL.createObjectURL(avatar)}
									alt='Thumb'
								/>
								<Button
									style={{ marginTop: '10px' }}
									onClick={() => setAvatar('')}
								>
									Remove This Image
								</Button>
							</div>
						)}
					</Form.Group>
				</div>

				<div className='buttons'>
					<button onClick={(e) => handleSubmit(e)} type='submit'>
						Thêm mới
					</button>
					<button onClick={cancelAdd}>Huỷ</button>
				</div>
			</Form>
		</div>
	);
};

export default AddStudent;


