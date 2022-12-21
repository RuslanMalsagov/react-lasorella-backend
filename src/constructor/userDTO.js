module.exports = function UserDTO(user) {
  (this.login = user.login), (this.password = user.password), (this.id = user._id), (this.email = user.email);
};
