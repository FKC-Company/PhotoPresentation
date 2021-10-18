
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const userTable = require("../models").userModel;


const { m_users } = require("../models");

exports.login = async (req, res)  => {
	try {
		const { email, password } = req.body;
		if(!email || !password)  {
			return res.status(400).render('login', {
				msgStatus: "danger",
				message: 'Please provide an email and password'
			});
		}

		const results = await m_users.findOne({ where: { email: email } });
		if(results === null || !(await bcrypt.compare(password, results.password)))  {
			res.render('login', {
				msgStatus: "danger",
				message: 'Email or password is incorrect'
			});
		}
		else {
			const id = results.user_id;
			const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRES_IN
			});

			const cookieOptions = {
				expires: new Date(
					Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
				),
				httpOnly: true
			}

			req.session.user = results;
			res.cookie('jwt', token, cookieOptions);
			res.status(200).redirect("/meet");
		}
	} catch (error) {
		console.log(error);
	}
}

exports.logout = (req, res) => {
	req.session.destroy();
	res.redirect('/');
}