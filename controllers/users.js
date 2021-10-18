const bcrypt = require("bcryptjs");
// const userTable = require("../models").userModel;

const { m_users } = require("../models");

exports.register = (req, res) => {
	res.render('users/register');
};

exports.registerExc = async (req, res) => {
	try {
		const {name, email, password, passwordConfrim} = req.body;
		const results = await m_users.findAll({ where: { email: email } });
		if(results.length > 0)  {
			return res.render('users/register', {
				message: 'This email is already in use',
				msgStatus: "warning"
			});
		}
		else if(password !== passwordConfrim)  {
			return res.render('users/register',{
				message: 'Passwords do not match',
				msgStatus: "danger"
			});
		}

		let hashedPassword = await bcrypt.hash(password, 8);
		const newUser = await m_users.create({ 
			username: name,
			email: email,
			password: hashedPassword
		});

		if(newUser.user_id > 0)  {
			console.log("New user created...");
			return res.render('login',{
				message: 'User registered',
				msgStatus: "success"
			});
		}   
	} catch (error) {
		console.log(error);
	}
}
