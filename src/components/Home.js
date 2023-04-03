import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import studentLists from './studentLists.json';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { RiDeleteBin7Line, RiEdit2Line, RiSearchLine } from 'react-icons/ri';

const arr = [
	'FULLNAME',
	'MSSV',
	'EMAIL',
	'PHONE',
	'CMND',
	'QQDIACHI',
	'QQTINH',
	'NGAYSINH',
	'CHUYENNGANH',
	'DANTOC',
	'TONGIAO',
	'GIOITINH',
	'avatar',
];
const Home = ({ token }) => {
	const [userList, setUserList] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(3);
	const [totalCount, setTotalCount] = useState();
	const [search, setSearch] = useState('');
	const [data, setData] = useState(null);
	// const [token, setToken] = useState('');
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState('');
	const pages = [];
	let history = useNavigate();
	console.log(data, totalCount, page, pageSize / 2);

	useEffect(() => {
		fetchData();
	}, [token]);

	const fetchData = async (sr = search, pg = page, pgSize = pageSize) => {
		// setLoading(true);
		try {
			const { data: response } = await axios.post(
				'http://localhost:9090/dbProcedure/get/DFAA77D5132B47F7BF53E7389CF4E61C',
				{
					sQUEQUANTINH: 0,
					sNOIOTINH: 0,
					pageNumber: pg - 1,
					limitNumber: pgSize,
					text: sr,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				},
			);
			setData(response.data.content.data);
			setTotalCount(response.data.content.data[0].TOLTALRECORD);
		} catch (error) {
			console.error(error.message);
		}
		// setLoading(false);
	};

	const prevPage = () => {
		const pg = page === 1 ? 1 : page - 1;
		fetchData('', pg, pageSize);
		setPage(pg);
	};

	const nextPage = () => {
		const pg = page < Math.ceil(totalCount / pageSize) ? page + 1 : page;
		fetchData('', pg, pageSize);
		setPage(pg);
	};

	const selectPageSize = (e) => {
		const pgSize = e.target.value;
		fetchData('', 1, pgSize);
		setPageSize(pgSize);
	};

	const handleSearch = () => {
		fetchData(search, 1, 1000);
	};

	const handleEdit = (id) => {
		history('/edit/' + id);
	};

	const handleDelete = async (id) => {
		try {
			await axios
				.delete(
					`http://localhost:9090/dbProcedure/delete/5CE842BF562A425D9491E77032E85DA6/${id}`,

					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						data: {},
					},
				)
				.then((res) => {
					console.log(res.data);
					toast.error('delete success', {
						position: toast.POSITION.BOTTOM_LEFT,
					});
					fetchData(search, page, pageSize);
				});
		} catch (error) {
			console.error(error.message);
		}
	};

	const formatDate = (date) => {
		var options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date1 = new Date(date);
		return date1.toLocaleDateString('vi-VN', options);
	};

	return (
		<>
			{loading && <div>Loading...</div>}
			{!loading && (
				<div style={{ margin: '10px' }}>
					<div className='d-inline-flex w-100 p-2'>
						<Form.Control
							style={{ paddingRight: '5px' }}
							type='text'
							value={search}
							placeholder='Search'
							onChange={(e) => setSearch(e.target.value)}
						></Form.Control>
						<Button
							variant='warning'
							style={{ marginLeft: '10px', width: '200px' }}
							onClick={handleSearch}
						>
							<RiSearchLine />
						</Button>
					</div>
					<div className='d-flex justify-content-center align-items-center p-2'>
						<Link to={'/create'}>
							<Button variant='success' style={{ width: '200px' }}>
								<MdPersonAddAlt1 />
							</Button>
						</Link>
					</div>
					<Table striped bordered hover size='sm'>
						<thead className='bg-warning'>
							<tr className='text-center'>
								<th scope='col'>STT</th>
								<th scope='col'>Xử lý</th>
								<th scope='col'>Họ tên</th>
								<th scope='col'>Mã SV</th>
								<th scope='col'>Email</th>
								<th scope='col'>SĐT</th>
								<th scope='col'>Số CCCD</th>
								<th scope='col'>Quê quán</th>
								<th scope='col'>Nơi TT</th>
								<th scope='col'>Ngày sinh</th>
								<th scope='col'>Chuyên ngành</th>
								<th scope='col'>Dân tộc</th>
								<th scope='col'>Tôn giáo</th>
								<th scope='col'>Giới tính</th>
								<th scope='col'>Ảnh chân dung</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.length > 0 &&
								data.map((student, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>
											{/* <Link to={`/edit/${student.ID}`}> */}
											<Button
												onClick={() => {
													handleEdit(student.ID);
												}}
												variant='info'
											>
												<RiEdit2Line />
											</Button>
											{/* </Link> */}
											<Button
												variant='danger'
												onClick={() => {
													handleDelete(student.ID);
												}}
											>
												<RiDeleteBin7Line />
											</Button>
										</td>
										{arr.map((e) => (
											<td>
												{e == 'GIOITINH'
													? student[e] == 0
														? 'Nữ'
														: student[e] == 1
														? 'Nam'
														: 'Không xác định'
													: e === 'NGAYSINH'
													? `${formatDate(student[e])}`
													: student[e]}
											</td>
										))}
									</tr>
								))}
						</tbody>
					</Table>
					<div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between'>
						<span className='text-xs xs:text-sm text-gray-900'></span>
						<div
							className='d-grid gap-5'
							style={{ gridTemplateColumns: '10% 10% 50%' }}
						>
							<button onClick={prevPage}>Prev</button>
							<button onClick={nextPage}>Next</button>
							<div>
								<span>Số bản ghi/trang </span>
								<select onChange={(e) => selectPageSize(e)}>
									<option value={3}>3</option>
									<option value={2}>2</option>
									<option value={4}>4</option>
									<option value={6}>6</option>
									<option value={10}>10</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
