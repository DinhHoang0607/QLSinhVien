import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const today = new Date();

const EditStudent = ({ token }) => {
	const [name, setName] = useState('');
	const [studentSCode, setStudentCode] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [identifyCard, setIdentifyCard] = useState('');
	const [address, setAddress] = useState('');
	const [addressLive, setAddressLive] = useState('');
	const [birthday, setBirthday] = useState('');
	const [major, setMajor] = useState('');
	const [nation, setNation] = useState('');
	const [gender, setGender] = useState(0);
	const [avatar, setAvatar] = useState('');
	const [religion, setReligion] = useState('');
	const [student, setStudent] = useState(null);

	const { id } = useParams();

	let history = useNavigate();

	useEffect(() => {
		if (id) {
			getById();
		}
	}, []);

	const getById = async () => {
		// setLoading(true);
		try {
			return await axios
				.post(
					'http://localhost:9090/dbProcedure/get/F3C47AE086BD4D81A92AD852C360169C',
					{
						STUDENTID: Number(id),
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					},
				)
				.then((res) => {
					const std = res.data.data.content.data[0];
					console.log(std);
					setStudent(res.data.data.content.data[0]);
					setName(std.FULL_NAME);
					setIdentifyCard(std.CMND);
					setEmail(std.EMAIL);
					setPhoneNumber(std.PHONE);
					setStudentCode(std.MSSV);
					setBirthday(std.NGAY_SINH);
					setMajor(std.CHUYEN_NGANH);
					setNation(std.DAN_TOC);
					setReligion(std.TON_GIAO);
					setGender(std.GIOI_TINH);
				});
		} catch (error) {
			console.error(error.message);
		}
		//   return response
	};
	console.log(birthday);

	const handleSubmit = async () => {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		};
		let data = {
			sMSSV: studentSCode,
			sEMAIL: email,
			sPHONE: phoneNumber,
			sCMND: identifyCard,
			sQUEQUANTINH: 0,
			sQUEQUANHUYEN: 0,
			sQUEQUANXA: 0,
			sQUEQUANDIACHI: 'Thanh Hoá',
			sNOIOTINH: 0,
			sNOIOHUYEN: 0,
			sNOIOXA: 0,
			sNOIODIACHI: 'Hà Nội',
			sNGAYSINH: '1996-11-11 00:00:00',
			sCHUYENNGANH: major,
			sDANTOC: nation,
			sTONGIAO: religion,
			sGIOITINH: 1,
			sName: name,
		};
		let url =
			'http://localhost:9090/dbProcedure/update/5A0D044DEA7C4399BB26C47972297594/' +
			id;
		await axios
			.put(url, data, { headers: headers })
			.then((res) => {
				console.log(res.data);
				toast.done('add success');
			})
			.catch((error) => {
				console.error(error.message);
			});
		history('/');
	};

	const cancelAdd = () => {
		history('/');
	};
	return (
		<>
			<div>
				<h1 className='text-center pt-5'>EDIT STUDENT</h1>
				{student && (
					<Form
						className='d-flex flex-column justify-content-center align-items-center'
						// style={{ margin: '10%', gridTemplateColumns: '50% 50%' }}
					>
						<div
							className='d-grid gap-2'
							style={{ margin: '3%', gridTemplateColumns: '50% 50%' }}
						>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Họ tên</Form.Label>
								<Form.Control
									defaultValue={name}
									type='text'
									placeholder='Ho va ten'
									required
									onChange={(e) => setName(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formS'>
								<Form.Label>Mã sinh viên</Form.Label>
								<Form.Control
									defaultValue={studentSCode}
									type='text'
									placeholder='Ma sinh vien'
									required
									onChange={(e) => setStudentCode(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									defaultValue={email}
									placeholder='Email'
									required
									onChange={(e) => setEmail(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Số điện thoại</Form.Label>
								<Form.Control
									type='tel'
									defaultValue={phoneNumber}
									placeholder='So dien thoai'
									required
									onChange={(e) => setPhoneNumber(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>CMND/CCCD</Form.Label>
								<Form.Control
									type='number'
									defaultValue={identifyCard}
									placeholder='So cmnd/cccd'
									required
									onChange={(e) => setIdentifyCard(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Ngày sinh</Form.Label>
								<Form.Control
									defaultValue={birthday}
									type='date'
									onChange={(e) => setBirthday(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Chuyên ngành</Form.Label>
								<Form.Control
									type='text'
									defaultValue={major}
									placeholder='Chuyên ngành'
									required
									onChange={(e) => setMajor(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Dân tộc</Form.Label>
								<Form.Control
									type='text'
									defaultValue={nation}
									placeholder='Dân tộc'
									required
									onChange={(e) => setNation(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Tôn giáo</Form.Label>
								<Form.Control
									type='text'
									defaultValue={religion}
									placeholder='Tôn giáo'
									required
									onChange={(e) => setReligion(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Giới tính</Form.Label>
								<Form.Select
									defaultValue={gender}
									onChange={(e) => setGender(e.target.value)}
								>
									<option value={1}>Nam</option>
									<option value={2}>Nữ</option>
									<option value={3}>Không xác định</option>
								</Form.Select>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formName'>
								<Form.Label>Ảnh chân dung</Form.Label>
								<Form.Control type='file'></Form.Control>
							</Form.Group>
						</div>
						<div className='buttons'>
							<button onClick={(e) => handleSubmit(e)} type='button'>
								Lưu
							</button>
							<button onClick={cancelAdd}>Huỷ</button>
						</div>
					</Form>
				)}
			</div>
		</>
	);
};

export default EditStudent;
