FROM node:20

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get -y install --no-install-recommends \
  curl \
  git \
  zsh \
  #
  # Install oh-my-zsh
  && zsh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
  && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
  && sed -i "/^plugins=/c\plugins=(git dotenv)" ~/.zshrc \
  #
  # Clean up
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=dialog