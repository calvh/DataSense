module.exports = (router, passport, jwt, jwtConfig) => {
  router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      if (!user) {
        return res.status(422).send({ error: info.message });
      }
      req.logIn(user, { session: false }, function(err) {
        if (err) {
          console.log(err);
          return res.status(400).send({ error: err });
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          jwtConfig.secret
        );
        console.log("test");
        console.log(token);

        res.status(200).send({
          auth: true,
          token: token,
          message: "user found & logged in",
        });
      });
    })(req, res, next);
  });
};
