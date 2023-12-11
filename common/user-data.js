module.exports = [
  `#!/bin/bash
  # Use this for your user data (script from top to bottom)
  # install httpd (Linux 2 version)
  yum update -y
  yum install -y httpd
  systemctl start httpd
  systemctl enable httpd
  echo "<h1>EC2</h1><hr><p>from $(hostname -f)</p>" > /var/www/html/index.html
`]
