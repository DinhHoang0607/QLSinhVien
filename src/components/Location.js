import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
const api = 'https://provinces.open-api.vn/api/';
var address = '';

const Location = ({ setAddress }) => {
	const [provinces, setProvinces] = useState([]);
	const [provinceSelected, setProvinceSelected] = useState(-1);
	const [districts, setDistricts] = useState([]);
	const [districtSelected, setDistrictSelected] = useState(-1);
	const [wards, setWards] = useState([]);
	useEffect(() => {
		callAPI('https://provinces.open-api.vn/api/?depth=1');
	}, []);

	useEffect(() => {
		callApiDistrict(`${api}p/${provinceSelected}?depth=2`);
	}, [provinceSelected]);

	useEffect(() => {
		callApiWard(`${api}d/${districtSelected}?depth=2`);
	}, [districtSelected]);

	console.log(provinceSelected);
	const callAPI = async (api) => {
		return await axios.get(api).then((response) => {
			setProvinces(response.data);
			console.log('province', response.data);
		});
	};
	const callApiDistrict = async (api) => {
		if (provinceSelected === -1) return;
		return await axios.get(api).then((response) => {
			console.log('district', response.data.districts);
			setDistricts(response.data.districts);
		});
	};
	const callApiWard = async (api) => {
		if (districtSelected === -1) return;
		return await axios.get(api).then((response) => {
			console.log('ward', response.data);
			setWards(response.data.wards);
		});
	};

	const getProvince = (e) => {
		address += e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text;
		setProvinceSelected(e.target.value);
	};
	const getDistrict = (e) => {
		address +=
			'-' + e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text;
		setDistrictSelected(e.target.value);
	};
	const getWard = (e) => {
		address +=
			'-' + e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text;
		setAddress(address);
	};
	return (
		<>
			<Form.Group className='mb-3' controlId='formName'>
				<Form.Label>Tỉnh/ Thành phố</Form.Label>
				<Form.Select onChange={getProvince}>
					<option value={-1}>Tỉnh/ Thành phố</option>
					{provinces.map((province) => (
						<option value={province.code}>{province.name}</option>
					))}
				</Form.Select>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formName'>
				<Form.Label>Quận/ Huyện</Form.Label>
				<Form.Select onChange={getDistrict}>
					<option>Quận/ Huyện</option>
					{districts &&
						provinceSelected !== -1 &&
						districts.map((district) => (
							<option value={district.code}>{district.name}</option>
						))}
				</Form.Select>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formName'>
				<Form.Label>Phường/ Xã</Form.Label>
				<Form.Select onChange={getWard}>
					<option>Phường/ Xã</option>
					{wards &&
						districtSelected !== -1 &&
						wards.map((ward) => <option value={ward.code}>{ward.name}</option>)}
				</Form.Select>
			</Form.Group>
		</>
	);
};

export default Location;
