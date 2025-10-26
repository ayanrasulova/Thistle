import os
import platform
import subprocess
import sys

def run_list(cmd_list):
    print("→", " ".join(cmd_list))
    subprocess.run(cmd_list, check=True)

def main():
    if sys.version_info[:2] != (3, 12):
        print(
            f"⚠️  This script requires Python 3.12 exactly. "
            f"You are using {sys.version_info.major}.{sys.version_info.minor}."
        )
        print(
        "Please install Python 3.12 from https://www.python.org/downloads/release/python-3120/"
    )

        sys.exit(1)

    system = platform.system().lower()
    python_cmd = "python" if system == "windows" else "python3"
    venv_dir = ".venv"

    # Create venv if missing
    if not os.path.exists(venv_dir):
        run_list([python_cmd, "-m", ".venv", venv_dir])
    else:
        print("Virtual environment already exists.")

    # Build path to the venv pip
    if system == "windows":
        pip_path = os.path.join(venv_dir, "Scripts", "pip.exe")
    else:
        pip_path = os.path.join(venv_dir, "bin", "pip")

    # Install dependencies using the venv pip directly
    if os.path.exists("dependencies.txt"):
        run_list([pip_path, "install", "-r", "dependencies.txt"])
    else:
        print("No requirements.txt found — skipping pip install.")

    # Install mediapipe using nvm which is installed from dependencies.txt
    # cmd = "npm install tailwindcss @tailwindcss/vite"
    # run_list(cmd)

if __name__ == "__main__":
    main()
