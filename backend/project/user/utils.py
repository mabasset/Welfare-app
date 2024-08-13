import re

def camel_to_snake(camel_str):
	# Add an underscore before each uppercase letter (except the first letter) and convert to lowercase
	snake_str = re.sub(r'(?<!^)(?<!^)(?<!^)([A-Z])', r'_\1', camel_str).lower()
	return snake_str